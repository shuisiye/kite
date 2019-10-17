const { resClientJson } = require('../../utils/resData')
const moment = require('moment')
const models = require('../../../db/mysqldb/index')
const Op = require('sequelize').Op
const clientWhere = require('../../utils/clientWhere')

class Subscribe {
  static async getArticleTagList (ctx) {
    let page = ctx.query.page || 1
    let pageSize = ctx.query.pageSize || 24
    let tag_name = ctx.query.tag_name
    let whereParams = {
      enable: 1
    }
    try {
      tag_name &&
        (whereParams['name'] = {
          [Op.like]: `%${tag_name}%`
        })

      let { count, rows } = await models.article_tag.findAndCountAll({
        attributes: [
          'tag_id',
          'name',
          'en_name',
          'icon',
          'description',
          'attention_count'
        ],
        where: whereParams, // 为空，获取全部，也可以自己添加条件
        offset: (page - 1) * pageSize, // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
        limit: pageSize, // 每页限制返回的数据条数
        order: [
          ['attention_count', 'DESC'] // ASC
        ]
      })

      for (let i in rows) {
        rows[i].setDataValue(
          'subscribe_count',
          await models.attention_tag.count({
            where: { tag_id: rows[i].tag_id }
          })
        )
        rows[i].setDataValue(
          'article_count',
          await models.article.count({
            where: {
              tag_ids: {
                [Op.like]: `%${rows[i].tag_id}%`
              },
              ...clientWhere.article.otherList
            }
          })
        )
      }

      await resClientJson(ctx, {
        state: 'success',
        message: 'subscribe',
        data: {
          page,
          count,
          pageSize,
          tag_name,
          article_tag_list: rows
        }
      })
    } catch (err) {
      resClientJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  static async getArticleTagListMy (ctx) {
    let page = ctx.query.page || 1
    let pageSize = ctx.query.pageSize || 25
    let { user = '' } = ctx.request
    let whereParams = {
      enable: 1
    }

    try {
      let allSubscribeArticleTag = await models.attention_tag.findAll({
        where: {
          uid: user.uid
        }
      })

      if (allSubscribeArticleTag.length > 0) {
        let myArticleTag = allSubscribeArticleTag.map(result => {
          return result.tag_id
        })

        myArticleTag &&
          (whereParams['tag_id'] = {
            [Op.regexp]: `${myArticleTag.join('|')}`
          })

        let { count, rows } = await models.article_tag.findAndCountAll({
          attributes: [
            'tag_id',
            'name',
            'en_name',
            'icon',
            'description',
            'attention_count'
          ],
          where: whereParams, // 为空，获取全部，也可以自己添加条件
          offset: (page - 1) * pageSize, // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
          limit: pageSize, // 每页限制返回的数据条数
          order: [
            ['attention_count', 'DESC'] // ASC
          ]
        })

        for (let i in rows) {
          rows[i].setDataValue(
            'subscribe_count',
            await models.attention_tag.count({
              where: { tag_id: rows[i].tag_id }
            })
          )
          rows[i].setDataValue(
            'article_count',
            await models.article.count({
              where: {
                tag_ids: {
                  [Op.like]: `%${rows[i].tag_id}%`
                },
                ...clientWhere.article.otherList
              }
            })
          )
        }

        await resClientJson(ctx, {
          state: 'success',
          message: 'subscribe',
          data: {
            page,
            count,
            pageSize,
            article_tag_list: rows
          }
        })
      } else {
        await resClientJson(ctx, {
          state: 'success',
          message: 'subscribe',
          data: {
            page: 1,
            count: 0,
            pageSize: 25,
            article_tag_list: []
          }
        })
      }
    } catch (err) {
      resClientJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 获取当前用户订阅的标签成功
   * @param   {object} ctx 上下文对象
   */

  static async getSubscribeTagMyAll (ctx) {
    let { user = '' } = ctx.request
    try {
      let allSubscribeArticleTag = await models.attention_tag.findAll({
        where: {
          uid: user.uid
        }
      })
      resClientJson(ctx, {
        state: 'success',
        message: '获取当前用户订阅的标签成功',
        data: {
          subscribe_article_tag: allSubscribeArticleTag
        }
      })
    } catch (err) {
      resClientJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  static async setSubscribeTag (ctx) {
    const { tag_id } = ctx.request.body
    let { user = '' } = ctx.request
    let type = ''
    try {
      let oneSubscribeArticleTag = await models.attention_tag.findOne({
        where: {
          uid: user.uid,
          tag_id
        }
      })

      if (oneSubscribeArticleTag) {
        /* 判断是否关注了，是则取消，否则添加 */
        type = 'cancel'
        await models.attention_tag.destroy({
          where: {
            uid: user.uid,
            tag_id
          }
        })
      } else {
        type = 'attention'
        await models.attention_tag.create({
          uid: user.uid,
          tag_id
        })
      }

      let articleTagRssCount = await models.attention_tag.count({
        where: {
          tag_id
        }
      })

      await models.article_tag.update(
        {
          attention_count: articleTagRssCount
        },
        {
          where: {
            tag_id
          }
        }
      )

      resClientJson(ctx, {
        state: 'success',
        message:
          type === 'attention' ? '关注文章标签成功' : '取消关注文章标签成功',
        data: {
          type
        }
      })
    } catch (err) {
      resClientJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  // 订阅动态话题
  static async setSubscribeDynamicTopic (ctx) {
    const { topic_id } = ctx.request.body
    let { user = '' } = ctx.request
    let type = ''
    try {
      let oneSubscribeDynamicTopic = await models.attention_topic.findOne({
        where: {
          uid: user.uid,
          topic_id
        }
      })

      if (oneSubscribeDynamicTopic) {
        /* 判断是否关注了，是则取消，否则添加 */
        type = 'cancel'
        await models.attention_topic.destroy({
          where: {
            uid: user.uid,
            topic_id
          }
        })
      } else {
        type = 'attention'
        await models.attention_topic.create({
          uid: user.uid,
          topic_id
        })
      }

      let dynamicTopicRssCount = await models.attention_topic.count({
        where: {
          topic_id
        }
      })

      await models.dynamic_topic.update(
        {
          rss_count: dynamicTopicRssCount
        },
        {
          where: {
            topic_id
          }
        }
      )

      resClientJson(ctx, {
        state: 'success',
        message:
          type === 'attention' ? '关注动态话题成功' : '取消关注动态话题成功',
        data: {
          type
        }
      })
    } catch (err) {
      resClientJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }
}

module.exports = Subscribe
