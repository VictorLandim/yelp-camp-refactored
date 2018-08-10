const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('landing'));

router.get('/favicon.ico', (req, res) => {
    const favicon = new Buffer(
        `iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOMSURBVGhD5ZpLqE9dGIePOyMpCUlSBgoDd0IZKFGKXIoSH5KSu5hQLmGgSGLmUgwklMtAIjFQ9OUyQKKIhDIhuVeX51dq9V71l7Lf/3XxFPP5O2sd73v2fvstdfapyWChXgYz2MvBWAJPmv1pAKtHMJjuB27KhBgOh7ADThcgWZzH332l8B2IxV7KYCrTxA/2fbws0hbM4bBr6rfvFxTQyWIEAfiPyOoOaApvsJoopZG628VqRP7ASZidj1hNktLIBAUCtNWIfIIdMSvuBCmNTFMgQKgRuQCz0Q3d5CmNzFQgQF0jlzEb3dFNntLIfAUC1DXyCbPdXlo33OQpjSxSIEBdI3IEZkGFu4lTGlmhQICYRhZjFgaimzilkVUKBIhpZCtmYSi6iUei2ItV7J4C0A6fYxVXoSFiGjmIWRiGbuJXeAG1ArvxU3jWi23BEDGNuO9xDaFFzZogxt0YomgjY9GaIMadGGIHWuNcszXSD60JYlyOIXTFrHGu2Rppjy/QmqTOujVgH1rjXLW/ycYatCYJ6T6S2IIWmNdN2E2OuBFtCayfIsDsI4zaI13nYhZ6Yy6zNZkrndRi2gMV9DKUakNndampqB9trvRqtRmSE8pNRyLtrZHte6l86GGYTf0J10JabyGN0crrqVi/AQ3YnVXCqv0c1RRR7YBHeoTu5Fs5UvqKbQ2oPove7InRCv4BZmEJP9HP8wjlYDD1a/SLqXtl9hqCfI9sqHstk9IvQiWEKM9DPMQqLouNSv4jUp8x69HPooKMoWi/8IvQUS0FnyX4O/d0U5QT6RXzBlFVYRz1Dt2yRbmBfhGyD8ZiLYZ7sCjuvtw1ZS3RFfTHP8Ji6E3Yfz2pnIsx9EZrvOyLRQjtGDdiDKPRGi/nYRHGoFWA3I8xTEVrvIzN0TBT0CpA6pNbDHoNscbLYm9s9EqQJ7DGKwFtfIOFuE/tAqQ1zCGtWiNl6kL618TKuJ/jCF0MKe9SBFWo1WAjG1kHVrjpQ7Bi6BPBVYBMuYISIRyFGtkKVoFyKsYwzK0xstbWAR9F7QKkKcxBu0mrfGy2OM3tCrrCDQGfUO3xsujWAT/m6KrHgQxWFvlym1YjJdoFTEeY9C5QNaObTgFsM6fH6PXTCWSjnIkpe5qG0SGBJnWL2IUpWH/waq44oijQ7rPeBzr/jfLQnt/XUl9j7yO2iL867S0/AG7zdLRhCM4JwAAAABJRU5ErkJggg==`,
        'base64'
    );

    res.statusCode = 200;
    res.setHeader('Content-Length', favicon.length);
    res.setHeader('Content-Type', 'image/x-icon');
    res.end(favicon);
});

module.exports = router;
