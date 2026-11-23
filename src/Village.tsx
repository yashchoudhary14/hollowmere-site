import { useState } from 'react'
import { GITHUB_URL, SITE_BASE, houseImagePath } from './config'
import { Icon } from './icons'
import village from './village-map.json'

const HOUSE_NOTES: Readonly<Record<string, string>> = {
  H00: 'A blue door and a clock face mark the clockmaker’s narrow Georgian shop on Main Street.',
  H01: 'The green shutters stay closed on this 1930s house, with a walled vegetable garden behind it.',
  H02: 'Beside the stream bridge, a single window glows beneath the thatch and a rocking chair waits on the porch.',
  H03: 'Pointed windows and a steep gable rise from the stone house by the schoolyard wall.',
  H04: 'A ribbon of small windows stretches across the stone cottage, lighting the loom shop upstairs.',
  H05: 'Behind iron railings and a monkey-puzzle tree, a brass nameplate marks the surgery entrance beside the white villa.',
  H06: 'Twin bay windows, twin dormers and two yellow doors make the joined Victorian cottages look like mirror images.',
  H07: 'Ivy climbs the tall Gothic house beside the chapel. A pointed window marks the organ bay.',
  H08: 'A torn striped awning hangs over the tiled butcher’s shop. There’s a family flat above and a cold room behind.',
  H09: 'At the end of Mill Lane, a waterwheel hangs beside the black weatherboards of the three-storey mill.',
  H10: 'The portrait shop faces Main Street, and a glass-roofed studio glints over the garden wall.',
  H11: 'A private oratory juts toward the lane from the stone presbytery, its pointed window below a tiny belfry.',
  H12: 'A red pillar box and an enamel post office sign stand beside the sorting room of this twin-gabled house.',
  H13: 'One moss-covered roof spans the farmhouse and barn, and a rusty tractor sits in the yard.',
  H14: 'Dolls stare from the bow window of the village’s oldest house. Its timber-framed upper floor leans over the street.',
}

function project([east, north]: readonly number[]) {
  return [east + 180, 175 - north] as const
}

function points(path: readonly number[][]) {
  return path.map((point) => project(point).join(',')).join(' ')
}

type House = (typeof village.houses)[number]

function VillageMap({ house, onSelect }: { house: House; onSelect: (index: number) => void }) {
  const [selectedX, selectedY] = project(house.point)

  return (
    <svg className="village-map" viewBox="0 0 360 352" role="img" aria-labelledby="map-title map-description">
      <title id="map-title">Hollowmere village plan</title>
      <desc id="map-description">North is up. The gate and square are at the north end of Main Street, which runs south to the Green. {house.name} is marked near {house.street}.</desc>
      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="#627166" strokeOpacity=".22" strokeWidth=".4" /></pattern>
        <pattern id="map-forest" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v8" stroke="#738178" strokeOpacity=".24" strokeWidth="1" /></pattern>
      </defs>
      <rect width="360" height="352" fill="#1a221f" />
      <rect width="360" height="352" fill="url(#map-grid)" />
      <path d="M30 25H330V325H30ZM51 47V309H309V47Z" fill="url(#map-forest)" fillRule="evenodd" />
      <path d="M172 25H30V325H330V25H188" fill="none" stroke="#8b9a8b" strokeWidth="1.1" strokeDasharray="2 2" />
      <path d="M180 25V0" stroke="#929a89" strokeWidth="3" strokeDasharray="2 3" />
      <polyline className="map-water" points={points(village.stream)} />
      {village.landmarks.map(({ id, point, size }) => {
        const [x, y] = project(point)
        const [width, height] = size
        if (id === 'L_GREEN' || id === 'L_POND') return <ellipse key={id} className={id === 'L_GREEN' ? 'map-green' : 'map-pond'} cx={x} cy={y} rx={width / 2} ry={height / 2} />
        return <rect key={id} className={id === 'L_SQUARE' ? 'map-square' : 'map-landmark'} x={x - width / 2} y={y - height / 2} width={width} height={height} />
      })}
      {village.roads.map((road) => <polyline key={road.id} className={`map-road map-${road.kind}`} points={points(road.points)} />)}
      {village.buildings.map(({ id, point, size, yaw }) => {
        const [x, y] = project(point)
        return <rect key={id} className="map-building" x={x - size[0] / 2} y={y - size[1] / 2} width={size[0]} height={size[1]} transform={`rotate(${yaw} ${x} ${y})`} />
      })}
      {village.houses.map(({ id, point, plot }, index) => {
        const [x, y] = project(point)
        return (
          <g key={id} className="map-hit" data-house={id} onClick={() => onSelect(index)}>
            <polygon className={id === house.id ? 'map-plot is-selected' : 'map-plot'} points={points(plot)} />
            <circle cx={x} cy={y} r="7" fill="transparent" />
            <circle className="map-dot" cx={x} cy={y} r="2.2" />
          </g>
        )
      })}
      <g className="map-labels">
        <text x="202" y="18">Village gate</text>
        <text x="180" y="63" textAnchor="middle">The Square</text>
        <text x="106" y="53" textAnchor="end">Chapel</text>
        <text x="181" y="174" textAnchor="middle">The Green</text>
        <text x="61" y="234">Mill Pond</text>
        <text x="250" y="239">East Road</text>
        <text x="309" y="48" textAnchor="middle">N</text>
        <path d="M309 53v12m-3-9 3-3 3 3M50 311h50m-50-2v4m50-4v4" fill="none" stroke="currentColor" strokeWidth=".8" />
        <text x="75" y="305" textAnchor="middle">50 m</text>
      </g>
      <g className="map-selected" transform={`translate(${selectedX} ${selectedY})`}>
        <circle r="7.5" />
        <circle r="3" />
      </g>
    </svg>
  )
}

export function Village() {
  const [index, setIndex] = useState(0)
  const house = village.houses[index]
  const houseCount = village.houses.length

  return (
    <section id="village" className="section village-section" aria-labelledby="village-title">
      <div className="shell">
        <div className="section-intro editorial-grid">
          <div><p className="eyebrow"><span />The Village</p><h2 id="village-title">Fifteen houses.<br /><em>One belongs to you.</em></h2></div>
          <p className="body-copy">Take a look inside the wall. From the square, Main Street runs down to the Green, where the lanes split toward the chapel, the fields, and the old mill. Your assigned house changes between matches, and so does your route back after dark.</p>
        </div>
        <div className="village-atlas">
          <figure className="atlas-figure">
            <VillageMap house={house} onSelect={setIndex} />
            <figcaption><span>Village v2 · Approved ground plan</span><span className="atlas-key"><i /> Selected house</span></figcaption>
          </figure>
          <div className="atlas-panel">
            <div className="house-controls">
              <label className="house-select">Explore a house
                <span><select value={index} onChange={(event) => setIndex(Number(event.target.value))}>
                  {village.houses.map(({ id, name }, position) => <option key={id} value={position}>{name}</option>)}
                </select><Icon name="chevron" size={16} /></span>
              </label>
              <div className="house-pagination" aria-label="House navigation">
                <button type="button" aria-label="Previous house" onClick={() => setIndex((current) => (current + houseCount - 1) % houseCount)}><Icon name="chevron" size={18} /></button>
                <button type="button" aria-label="Next house" onClick={() => setIndex((current) => (current + 1) % houseCount)}><Icon name="chevron" size={18} /></button>
              </div>
            </div>
            <div className="house-copy" aria-live="polite" aria-atomic="true">
              <p className="house-coordinate">{house.street}</p>
              <h3>{house.name}</h3>
              <p className="body-copy">{HOUSE_NOTES[house.id]}</p>
            </div>
            <figure className="house-figure">
              <img src={`${SITE_BASE}${houseImagePath(house.id)}`} width="680" height="485" alt={`Early 3D massing study of ${house.name}`} loading="lazy" decoding="async" />
              <figcaption>Early 3D study <span>{index + 1} / {houseCount}</span></figcaption>
            </figure>
          </div>
        </div>
        <a className="text-link atlas-source" href={`${GITHUB_URL}/blob/main/docs/design/VILLAGE_LAYOUT.md`}>Read the village design notes</a>
      </div>
    </section>
  )
}
