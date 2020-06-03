require('dotenv').config()
import OAuth from 'oauth'

export default ( req, res, next ) => {
    let oauth = new OAuth.OAuth(
        'http://api.thenounproject.com',
        'http://api.thenounproject.com',
        process.env.NOUN_KEY,
        process.env.NOUN_SECRET,
        '1.0',
        null,
        'HMAC-SHA1'
    )

    try {
        oauth.get(
            `http://api.thenounproject.com/icons/${req.body.noun}`,
            null,
            null,
            function (e, data){
                
                if (e){
                    console.error('e', e)
                    res.send({ icon_url: false })
                }
                else {
                    let json = JSON.parse(data)
                    res.send({
                        icon_url: json.icons[0].preview_url
                    })
                }
                
            }
        )
    } catch(err){
        console.error('err', err)
    }
  }