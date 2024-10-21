const validUrl = require("valid-url")
const shortid = require("shortid")
const Url = require("../model/url")
// const redisClient = require("../config/redis")
const Redis = require("ioredis");

const redis = new Redis();
  

const createShortURL = async (req, res) => {
    const {originalUrl} = req.body;
    if(!originalUrl){
        return res.status(400).json({status: false, msg: "URL must be required"})
    }
    const baseUrl = "http://localhost:4000";
    if(!validUrl.isUri(originalUrl)){
        return res.status(400).json({status: false, msg: "Invalid URL"})
    }
    
    try{
       let url = await Url.findOne({originalUrl})
       if(url){
         return res.status(200).json({
           shortUrl: url.shortUrl,
           originalUrl: url.originalUrl,
           urlCode: url.urlCode
         })
       }
       const urlCode = shortid.generate();
       const shortUrl = `${baseUrl}/${urlCode}`;
        url = await Url.create({
            shortUrl,
            originalUrl,
            urlCode   
        });

       return res.status(201).json({
          status: true,
          shortUrl: shortUrl,
          originalUrl: originalUrl,
          urlCode: urlCode
       });
    }catch(err){
       return res.status(500).json({status:false, err: err.message})
    };
};


const redirectOriginalUrl = async (req, res) => {
     const {urlCode} = req.params;
     try{
     const chacheUrl = await redis.get(urlCode);
      if(
        chacheUrl){
        return res.redirect(chacheUrl);
      }
      const url = await Url.findOne({urlCode});
      if(url){
        await redis.set(urlCode, url.originalUrl, "EX", 86400)
        return res.redirect(url.originalUrl);
      }
      return res.status(404).json({error: "Url not found"})
     }
     catch(err){
       return res.status(500).json({error: "server error"})
     }
};



module.exports = {createShortURL, redirectOriginalUrl}
