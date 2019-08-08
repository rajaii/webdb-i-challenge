const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({message: "no luck retrieving accounts: boolean thunder_quack error 22-55_c", error: err});
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      /*name*/  const [account]  = await db.select('*').from('accounts').where({id});
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({message: 'could not retrieve that particular account'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    const postBody = req.body;
    try {
    const post = await db('accounts').insert(postBody);
    res.status(201).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    const changes =  req.body;
    const { id } = req.params;
    try {
        const updatedPost =  await db('accounts').where({id}).update(changes);
        if (updatedPost) {
            res.status(200).json(changes);
        } else {
            req.status(404).json({message: 'Could not update the post'});
        }
    } catch (err) {
        res.status(500).json(err.message);
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAccount = await db('accounts').where({id}).del();
        if(deletedAccount) {
            res.status(200).json({deleted: deletedAccount});
        } else {
            res.status(404).json({message: 'Account not deletable or does not exist'});
        }
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;