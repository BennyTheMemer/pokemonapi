export default function PokemonBox({
  name,
  SearchPokemon,
}: {
  name: string;
  SearchPokemon: any;
}) {
  return (
    <div>
      <button onClick={SearchPokemon}>{name}</button>
    </div>
  );
}
