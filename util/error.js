module.exports = {
    defaultErrorResponse: (e, t) => res => res.status(500).render(t, { e })
};
