

function getPolicieById(element, getPolicies, alls = true) {
    const policies = [];
    getPolicies.forEach(el => {
        if (el.clientId == element.id) {
            if (alls) {
                policies.push(
                    {
                        id: el.id,
                        amountInsured: el.amountInsured,
                        inceptionDate: el.inceptionDate
                    });
            } else {
                policies.push(el);
            }
        }
    });
    return policies;
}

module.exports = {
    getPolicieById
}