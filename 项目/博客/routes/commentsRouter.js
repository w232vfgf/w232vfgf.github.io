var express = require('express');
var url = require('url');
var router = express.Router();
var User = require('../models/User').User;
var Post = require('../models/Post').Post;
var Comment = require('../models/Comment').Comment;

router.get('/:commentId/remove', (req, res) => {
var commentId =req.params.commentId
Comment.findById(commentId,(err,result) => {
    if (err) {
        console.log('查找留言失败',err);
    }
    if (req.session.user) {
        if (result.author==req.session.user._id) {
            Comment.findByIdAndRemove(commentId,(err1,result1) => {
                req.flash('success','删除留言成功');
                 res.redirect('back');
            })
        } else {
            req.flash('error','没有权限删除留言');
             res.redirect('back');
        }
    } else {
        req.flash('error','请先登录');
         res.redirect('/login');
    }
})
});
// 发表留言
router.post('/:postId', function (req, res, next) {
    // 判断用户是否登陆 如果没登陆不允许 发布文章
    // 判断是否登陆的条件 就是看 session 里面有没有 user
    if (!req.session.user) {
        req.flash("error", '留言需要登陆');
        return res.redirect('/login');
    }
    next()
}, (req, res) => {
    // console.log('req.body', req.body)
    // console.log('req.params.postId', req.params.postId)

    var content = req.body.content
    var postId = req.params.postId
    var author = req.session.user._id

    // 校验参数
    try {
        if (!content) {
            throw new Error('评论内容不能为空')
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect('back');
        // 阻止代码继续向下执行 校验错误就不要写入数据库
        return
    }

    // console.log(content, postId, author)
    Comment.create({
        postId: postId,
        content: content,
        author: author
    }, (err, result) => {
        if (err) {
            console.log('发布留言失败', err)
        }

        req.flash("success", '发布留言成功');
        res.redirect('back');
    })

});

module.exports = router