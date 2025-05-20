import express from "express"
import {serverConfig, logger} from "./config/index.js";
import apiRoutes from "./routes/index.js"
const app = express()

app.use('/api', apiRoutes);

app.listen(serverConfig.PORT,()=>{
    console.log("Successfully connected to port",serverConfig.PORT)
    logger.info("Successfully connected to port",{})
})