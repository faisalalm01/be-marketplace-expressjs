# Market Place be with express

project untuk server market place yang dibuat dengan framework express js 

## Getting Started

- clone repo
`git clone https://github.com/faisalalm01/be-marketplace-expressjs`

- install dependencies
`npm install || yarn install` 

- migrate database
    - `cd src`
    - `npm sequelize db:create`
    - `npm sequelize db:migrate`

- create new table
    - `npx sequelize model:generate --name namatable --attributes namakolom:typedata`