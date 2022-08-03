const { getService } = require('@strapi/plugin-users-permissions/server/utils');

module.exports = (plugin) => {
    const getController = name => {
        return strapi.plugins['users-permissions'].controller(name);
    };

    plugin.controllers.user.create = async (ctx) => {
        const { email, username, role, token, symbolAddress} = ctx.request.body;
        console.log(token)
        if(token !== "test") throw new Error('This token is not allowed');

        const controller = getController("user");
        const newUser = {
            //...profile,
            //username: "aaa",
            symbolAddress,
            //provider: "symbol",
            //password: "Toshiya5955!",
            //role: 1,
            //confirmed: true,
        };
        const data = await getService('user').add(newUser);
        //strapi.entityService.create('plugin::users-permissions.user', {
        //    data: newUser,
        //    populate: ['role'],
        //});
          console.log('calling about meeeeeeeeeee------')

        return true;
    };

    // Add the custom route
    /*
    plugin.routes['content-api'].routes.unshift({
        method: 'POST',
        path: '/users',
        handler: 'user.create',
        config: {
            prefix: '',
        }
    });
    */

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