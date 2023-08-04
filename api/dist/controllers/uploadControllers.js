export const uploadPostImg = (req, res) => {
    const file = req.file;
    res.status(200).json(file?.filename);
};
//# sourceMappingURL=uploadControllers.js.map