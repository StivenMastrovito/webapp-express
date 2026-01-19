export default function notFound(req, res, next){
    return res.status(404).json({
        error: "Not Found",
        message: `path ${req.originalUrl} NOT FOUND` 
    })
}