export const getIsCookie = (req, res) => {
    const accessTokenCookie = req.cookies.accessToken;
    const accessTokenExists = !!accessTokenCookie;
    res.json({ accessTokenExists });
};
//# sourceMappingURL=cookieControllers.js.map