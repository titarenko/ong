# ong

Oh no! Globals!

# Installation

```bash
npm i ong --save

# Example

```js
require('ong').init().register({
	db: require('mydb')({ host: 'thishost '}),
	queue: require('myqueue')({ host: 'thathost' })
});

Promise.all([
	$.db.query('select * from everything'),
	$.queue.publish('universe', _.camelCase('my message'))
]).return(0).then(process.exit);
```

As you see from this example, Promise (bluebird), _ (lodash), and $ (registered shortcuts) are globals registered by ong and can be used anywhere within a process.

# API

## init([overwrite])

Registers 3 global variables (yes, global, because they are *very* intensively used): `Promise` (bluebird), `_` (lodash), `$` (shortcuts object). Warning! It will throw error if such globals already exist!

## register(name, value, [overwrite]) or registerGlobal(nameValueObject, [overwrite])

Puts `name` property to global `$` with `value`. Also can be called with 1 argument of type object, each property-value pair of it will be treated as `name`-`value` pair. There is also additional last argument which specifies whether previous value can be overwritten if exists (by default `ong` will throw if such name is already registered).

# License

MIT
