
fs.readFile('catalog.json', 'utf8', (err, data) => {
                    res.send(data);
                });