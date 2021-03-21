################
# curls  + tee #
################

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | 
    jq '[.[] | {name: .name, category: .category}]' | 
    tee myfile.json

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | 
    jq '[.[] | {name: .name, category: .category}]' | 
    tee myfile2.json 

git clone https://github.com/ErickWendel/lives-aquecimento02-javascript-expert.git

################
# FIND + XARGS #
################

cd lives-aquecimento02-javascript-expert
git submodule update --init --recursive

find . -name '*.js' -or -name '*.mjs'

ls | xargs wc -l

find . -name '*.js' -or -name '*.mjs' | xargs cat
find . -name '*.js' -or -name '*.mjs' | xargs head -n 1

############
# for & jq #
############

# d = diretório

CWD=`pwd`

for project in `find . -name 'recorded' -type d`
do
    cd $CWD/$project
    echo restoring $project
    cat ./package.json | jq '.dependencies'
    npm ci --silent
done
cd $CWD

# deletanto todos os node_modules
find . -name 'node_modules' -type d -exec rm -rf '{}' + 


###############
# IPT + XARGS #
###############

npm i -g ipt --silent

find . -name '*.js' -not -path '*node_modules*' | ipt | xargs cat
find . -name '*.js' -not -path '*node_modules*' | ipt -o | xargs wc -l

#########################
# XARGS MODO HARD + SED #
#########################

find . -name '*.json' -maxdepth 1 | 
    ipt -o | xargs -I {file} sed -e 's/category/categoria/' -e 's/name/nome/' {file}