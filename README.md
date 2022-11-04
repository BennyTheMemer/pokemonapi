## How to run

1. git clone git@github.com:BennyTheMemer/pokemonapi.git
2. cd pokemonapi
3. yarn
4. yarn dev

## Some of the steps during development

1. build a simple axios client, interceptors would be over engineering
2. create the homepage where the user will search for a pokemon by name (and perhaps by id as well?)
3. delete css boilerplate that comes with vite create
4. create a grid where we will display a list of pokemons. The API allows us to send offset and limit, which is usefull for pagination
5. copypaste a string distance algorithm to improve user experience when searching for a pokemon name, some tweeks would be needed
6. Use Axio's cancellation API paired with UseEffect cleanup in order to cancel previous requests from user when looking for next pokemon

## How to improve

1. Improve overall styling
2. Add tests
3. More info could be added to the pokemon, like it's evolution, image from the back and type. Some website styling could be messed with depending on pokemon type
4. Perhaps add routes alongside step 3.
5. String distance algo and how it's applied throuh javascript filter doesn't produce the ideal result, some tweeks could be done
