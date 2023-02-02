const express=require("express")
const router = express()
const axios=require("axios")

router.get("/getplace/:query", (req,res) => {
    const {query}=req.params
    const url=`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=formatted_address,name,place_id&key=${process.env.GOOGLE_CLOUD_KEY}`

    const config = {
        method: 'get',
        url: url,
        headers: { }
    };

    axios(config)
    .then(function (response) {
        let places=[]
        for (i=0;i<response.data.candidates.length;i++){
            const currentPlace=response.data.candidates[i]
            places.push({
                name: currentPlace.formatted_address,
                id: currentPlace.place_id
            })
        }

        res.json({stato: places})
    })
    .catch(function (error) {
        console.log(error);
    });
})

module.exports = router