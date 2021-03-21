import data from '../database/data.json';
import FluentSQLBuilder from './fluentSQL.js';

const result = FluentSQLBuilder.for(data)
    // ou inicia com 2020 ou 2019
    .where({registered: /^(2020|2019)/})
    // ^no inicio  --- fim$ ---- | ou
    .where({category: /^(security|developer|quality assurance)$/})
    // parenteses literais precisam de \
    .where({phone: /\((852|890|810)\)/})
    .select(['name', 'company', 'phone', 'category', 'registered'])
    .orderBy('category')
    .limit(2)
    .build();

console.table(result)