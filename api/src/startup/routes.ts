import express from 'express';
let healthRouter = require('../routes/health');
let authRouter = require('../routes/authentication');
let postRouter = require('../routes/forum-posts')
let commentRouter = require('../routes/post-comments')
let communityRouter = require('../routes/community')
// add more routers here

module.exports = function (app: express.Application) {
    app.use(express.json());
    app.use('/auth', authRouter); 
    app.use('/health', healthRouter);
    app.use('/forum', postRouter);
    app.use('/comments', commentRouter);
    app.use('/community', communityRouter);
};