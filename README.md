# insomnia-plugin-signing

Signs API requests using (HMAC-SHA256)

Looks for X-API-KEY, X-API-TS headers.
Signs the request and adds X-API-SIGN header

Signs it using API_SECRET from the Insomnia environment variable

---

This plugin is heavily based on [diegomura/insomnia-plugin-ftx-signing](https://github.com/diegomura/insomnia-plugin-ftx-signing)
