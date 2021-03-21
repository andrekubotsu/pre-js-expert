### Pré Semana JS Expert 

## Aula 01
# Padrão Builder: 
- Padrão usado para construir objetos sob demanda, ao invés de passar pelo constructor, a construção se dá através dos métodos (instâncias);
- Bastante usado em OO, para usar métodos em cadeia (chainning / Fluent Interface);
- Em outras palavras, um objeto muito complexo vai sendo quebrado em partes, e no final é feito a 'build';
- O unico momento que ocorre processamento de memória é na build;

# TDD
- neste padrão builder, os metodos privados são testados pelo build

# Dependências e configs
- Node 15
- Jest 26
- Database fake pelo JSON Generator