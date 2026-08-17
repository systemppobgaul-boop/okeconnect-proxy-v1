const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

export default async function handler(req, res) {
    const { key, url } = req.query;

    // 1. Kunci Rahasia (Samakan dengan di Master Control)
    const SECRET_KEY = "BOSKU_MANTAP_123";

    if (key !== SECRET_KEY) {
        return res.status(401).send("Akses Ditolak: Kunci Proxy Salah!");
    }
    if (!url) {
        return res.status(400).send("Error: URL tujuan tidak ditemukan.");
    }

    // 2. DATA WEBSHARE JURAGAN
    const proxyHost = "31.59.20.176"; 
    const proxyPort = "6754"; 
    const proxyUser = "ucquxssp"; 
    const proxyPass = "h21w5of9rxm1"; 

    const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
    const httpsAgent = new HttpsProxyAgent(proxyUrl);

    // 3. Tembak ke OkeConnect melewati Webshare
    try {
        const targetUrl = decodeURIComponent(url);
        const response = await axios.get(targetUrl, {
            httpsAgent: httpsAgent,
            timeout: 30000 
        });
        
        res.status(200).send(response.data);
    } catch (error) {
        const errorMsg = error.response ? error.response.data : error.message;
        res.status(500).send(errorMsg);
    }
}
