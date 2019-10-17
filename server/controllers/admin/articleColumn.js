const models = require('../../../db/mysqldb/index')
const { resAdminJson } = require('../../utils/resData')
const { createAdminSystemLog } = require('./adminSystemLog')

function ErrorMessage (message) {
  this.message = message
  this.name = 'UserException'
}

class ArticleColumn {
  /**
   * -----------------------------------权限操作--------------------------------
   * 创建标签
   * @param   {object} ctx 上下文对象
   */
  static async createArticleColumn (ctx) {
    const reqData = ctx.request.body

    try {
      let oneArticleColumnName = await models.article_column.findOne({
        where: { name: reqData.name }
      })
      if (oneArticleColumnName) {
        throw new ErrorMessage('专栏名已存在!')
      }
      let oneArticleColumnEnName = await models.article_column.findOne({
        where: { en_name: reqData.en_name }
      })
      if (oneArticleColumnEnName) {
        throw new ErrorMessage('专栏英文名已存在!')
      }

      if (reqData.en_name === 'all') {
        throw new ErrorMessage('英文名字不能等于all')
      }

      await models.article_column.create({
        ...reqData,
        tag_ids: reqData.tag_ids.join(',')
      })

      await createAdminSystemLog({
        // 写入日志
        uid: ctx.request.userInfo.uid,
        type: 3,
        content: `成功创建了‘${reqData.name}’文章专栏`
      })

      resAdminJson(ctx, {
        state: 'success',
        message: '专栏创建成功'
      })
    } catch (err) {
      resAdminJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 获取标签列表操作
   * @param   {object} ctx 上下文对象
   */
  static async getArticleColumnList (ctx) {
    const { page = 1, pageSize = 10 } = ctx.query
    try {
      let { count, rows } = await models.article_column.findAndCountAll({
        attributes: [
          'column_id',
          'name',
          'en_name',
          'icon',
          'tag_ids',
          'description',
          'sort',
          'is_home',
          'enable'
        ],
        where: '', // 为空，获取全部，也可以自己添加条件
        offset: (page - 1) * Number(pageSize), // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
        limit: Number(pageSize), // 每页限制返回的数据条数
        order: [
          ['sort', 'ASC'] // asc
        ]
      })
      resAdminJson(ctx, {
        state: 'success',
        message: '返回成功',
        data: {
          count: count,
          list: rows
        }
      })
    } catch (err) {
      resAdminJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 更新标签
   * @param   {object} ctx 上下文对象
   */
  static async updateArticleColumn (ctx) {
    const reqData = ctx.request.body
    try {
      await models.article_column.update(
        {
          ...reqData,
          tag_ids: reqData.tag_ids.join(',')
        },
        {
          where: {
            column_id: reqData.column_id // 查询条件
          }
        }
      )
      resAdminJson(ctx, {
        state: 'success',
        message: '更新专栏成功'
      })
    } catch (err) {
      resAdminJson(ctx, {
        state: 'error',
        message: '错误信息：' + err.message
      })
      return false
    }
  }

  /**
   * 删除标签
   */
  static async deleteArticleColumn (ctx) {
    const { column_id } = ctx.request.body

    await models.article_column
      .destroy({ where: { column_id } })
      .then(data => {
        resAdminJson(ctx, {
          state: 'success',
          message: '删除专栏成功'
        })
      })
      .catch(err => {
        console.log('failed: ' + err)
        resAdminJson(ctx, {
          state: 'error',
          message: '删除专栏失败'
        })
      })
  }
}

module.exports = ArticleColumn
