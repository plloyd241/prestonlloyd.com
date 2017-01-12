import express = require('express')

export function index(req: express.Request, res: express.Response): void {
    res.render('index')
}

export function about(req: express.Request, res: express.Response): void {
    res.render('about')
}
