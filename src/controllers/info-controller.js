const info = (req, res) => {
    return res
        .status(StatusCodes.OK)
        .json({
        success: true,
        message: "Api is working fine",
        error: {},
        data: {}
    })
}

export  default {
    info
}