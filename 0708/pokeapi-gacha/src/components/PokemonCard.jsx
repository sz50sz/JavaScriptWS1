export default function PokemonCard({ pokemon }) {
    const stats = pokemon.stats.reduce((acc, s) => {
        acc[s.stat.name] = s.base_stat;
        return acc;
    }, {});

    return (
        <article className="card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>タイプ：{pokemon.types.map((t) => t.type.name).join(" / ")}</p>
            <ul>
                <li>HP：{stats.hp}</li>
                <li>攻撃：{stats.attack}</li>
                <li>防御：{stats.defense}</li>
            </ul>
        </article>
    );
}
