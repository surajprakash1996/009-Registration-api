const mongoose =  require('mongoose');
const URL = process.env.URL;

(async () => {
    const options = {
        dbName:'Login-System',
        useNewUrlParser: true,
         useUnifiedTopology: true
    }
    try {
        await mongoose.connect(URL,options);
        console.log(`Connected!`);
    }
    catch(err) {
        console.log(`ERR : `, err.message);
        process.exit(1);
    }
})();