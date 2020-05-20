const request = require('request');

isUserAdmin = (req, res) => {
    const email = req.params.email;
    const url = process.env.AUTH_ROLES_BASE_URL;

    var options = {
        method: 'POST',
        url: process.env.AUTH_TOKEN_URL,
        headers: { 'content-type': 'application/json' },
        body: {
            grant_type: 'client_credentials',
            client_id: process.env.AUTH_CLIENT_ID,
            client_secret: process.env.AUTH_CLIENT_SECRET,
            audience: process.env.AUTH_AUDIENCE,
        },
        json: true,
    };

    request(options, (error, response, body) => {
        if (error) res.json({ error: error });
        const { access_token, token_type } = body;
        options = {
            method: 'GET',
            url: url,
            headers: { authorization: `${token_type} ${access_token}` },
            json: true,
        };

        request(options, (error, response, body) => {
            if (error) res.json({ error: error });
            const { id, name } = body[0];

            options = {
                method: 'GET',
                url: `${url}/${id}/users`,
                headers: { authorization: `${token_type} ${access_token}` },
                json: true,
            };

            request(options, (error, response, body) => {
                if (error) res.json({ error: error });
                res.json({
                    role: name,
                    verified: body.find((user) => user.email === email)
                        ? true
                        : false,
                });
            });
        });
    });
};
module.exports = {
    isUserAdmin,
};
