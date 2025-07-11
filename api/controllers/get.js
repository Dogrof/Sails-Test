module.exports = {
    inputs: {
        ...sails.config.inputs.entities.categoryPath,
        limit: { ...sails.config.inputs.fields.limit },
        offset: { ...sails.config.inputs.fields.offset },
        includeSlideshow: { ...sails.config.inputs.fields.includeSlideshow },
        json: { ...sails.config.inputs.fields.json }
    },

    exits: {
        ...sails.config.exits.api,
        html: {
            responseType: 'view',
            viewTemplatePath: 'pages/public/v2/stories'
        }
    },


    fn: async function(inputs, exits) {
        try{
            const LIMIT = typeof inputs.limit === 'number' ? inputs.limit : 11;
            const OFFSET = typeof inputs.offset === 'number' ? inputs.offset : 0;


            const stories = await FeedService.getTopStories({
                username: this.req.user.username,
                limit: LIMIT,
                offset: OFFSET
            });

            if(this.req.wantsJSON || inputs.json){
                return exits.success({ stories });
            }

            return exits.html({
                layout: 'layouts/v2/topicsFeed',
                title: sails.config.content.pages.topicFeed.title(requestedCategory.title),
                description: sails.config.content.pages.topicFeed.title(requestedCategory.title),
                shareImageURL: sails.config.content.pages.topicFeed.share.image.url(bgImage),
                requestedCategory: requestedCategory,
                stories,
                activeRoute: '',
                user: this.req.user,
            });

        }catch(err){
            sails.log.error(this.req.logCtx, 'Error while GET category feed: ', err);
            if(this.req.wantsJSON || inputs.json){
                return exits.internalServerError();
            }
            return exits.internalServerErrorHTML({error: err});
        }
    }

};
