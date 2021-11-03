async function getClients(req, res) {
    const { query } = req;
    res.status(200).send({ message: `${query}`});
}

module.exports = {
    getClients
}