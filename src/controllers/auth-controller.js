const auth = (req, res) => {
    return res.json({
        success: true,
        message: "Api is working fine",
        error: {},
        data: {}
    })
}

export default {
    auth
}