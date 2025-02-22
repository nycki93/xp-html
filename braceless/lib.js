module.exports = ((my) => (
  my.out = Object(),

  /** range from 0 to n */
  my.out.range = (n) => Array(n).fill().map((_, i) => i),

  /** supply a scope object to a lambda */
  my.out.withScope = (fn, init) => (...args) => fn(init ?? Object(), ...args),

  /** object literal without curly braces */
  my.out.obj = (...kvs) => (
    Object.fromEntries(my.out.range(kvs.length / 2 | 0).map(i => 
      [ kvs[2*i], kvs[2*i+1] ]
    ))
  ),

  /** object filter */
  my.out.pick = (o, keys) => Object.fromEntries(keys.map((k) => [ k, o[k] ])),

  /** while loop */
  my.out.loop = (fn) => fn() && my.out.loop(fn),

  my.tokens = (s) => s.matchAll(/([\(\)]|[^\s"\(\)]+|"([^\\"]|\\.)*")/g).map(m => m[0]),

  my.expr = my.out.withScope((sc, tokens) => (
    sc.out = [],
    my.out.loop(() => (
      sc.t = tokens.next(),
      !sc.t['done'] && (
        sc.t['value'] == ')' ? (0) :
        sc.t['value'] == '(' ? (sc.out.push(my.expr(tokens)), 1) :
        (sc.out.push(sc.t['value']), 1)
      )
    )),
    sc.out
  )),

  /** string to sexpression */
  my.out.sexpr = my.out.withScope((sc, str) => (
    sc.tokens = my.tokens(str),
    sc.expr = my.expr(sc.tokens),
    // handle missing parens as implicit list
    sc.expr.length > 1 ? sc.expr : sc.expr[0]
  )),

  require.main === module && (
    console.log(my.out.sexpr('((+ 1 2) "hello world" "captured\\"quote")')),
    console.log(my.out.sexpr('testing one two'))
  ),

  my.out
))(Object());
