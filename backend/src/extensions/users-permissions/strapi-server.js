const _ = require('lodash');

module.exports = (plugin) => {
    const getController = name => {
        return strapi.plugins['users-permissions'].controller(name);
    };

    // Create the new controller
    plugin.controllers.auth.register = async (ctx) => {
        const { email, username, role, token } = ctx.request.body;
        
        if(token !== "test") throw new Error('This token is not allowed');
    
        const controller = getController("user");
        const newUser = {
            //...profile,
            //username: "aaa",
            email: "bbb@gmail.com",
            provider: "symbol",
            password: "Toshiya5955!",
            //role: 1,
            //confirmed: true,
        };
        strapi.entityService.create('plugin::users-permissions.user', {
            data: newUser,
            populate: ['role'],
        });
        /*controller
          .create({ data: newUser });
          console.log('calling about meeeeeeeeeee------')*/

        return true;
    };

    // Add the custom route
    plugin.routes['content-api'].routes.unshift({
        method: 'POST',
        path: '/auth/local/register',
        handler: 'auth.register',
        config: {
            prefix: '',
        }
    });

    // Create the new controller
    /*
    plugin.controllers.auth.callback = async (ctx) => {
        return "test";
    };

    // Add the custom route
    plugin.routes['content-api'].routes.unshift({
        method: 'POST',
        path: '/auth/local/',
        handler: 'auth.callback',
        config: {
            prefix: '',
        }
    });
    */
    return plugin;
};