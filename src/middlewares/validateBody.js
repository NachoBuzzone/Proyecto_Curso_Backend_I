export const validateBody = (schema) => {

    return(req, res, next) => {

        const result = schema.safeParse(req.body)
        
        if(!result.success) {
            return res.status(400).json({
                status: "error",
                message: "invalid data",
                error: result.error.issues.map((issue) => ({
                    field: issue.path.join("."), 
                    message: issue.message 
                }))
            })
        }
        
        req.body = result.data
        next()
    }
}