const express = require ('express');
const fetch = require ('node-fetch');
const cors = require ('cors');
const app = express ();
const PORT = 3005;

app.use(cors());

app.get('/api/restaurants/:postcode', async ( req, res) => {
    const postcode = req.params.postcode;
    const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;

    console.log(`Fetching restaurants for: ${postcode}`);
    console.log(`URL: ${url}`);

   
    try {
        const response = await fetch (url,{
            headers: {
                'Accept-Tenant': 'uk',
                'Accept-Language': 'en-GB',
                'Accept': 'application/json'
            }
        });

        const data = await response.json ();
        console.log("API response:", data);

        res.json(data);
    } catch (err){
        console.log('Backend error:', err);
        res.status(500).json ({error: 'failed to fetch data'});
    }
    });
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        
    });