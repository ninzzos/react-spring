    npm install react-spring

```jsx
import React, { PureComponent } from 'react'
import Spring from 'react-spring'
import '../global.pcss'

const Content = ({ toggle, number, scale, path, gradientStart, gradientEnd, ...style }) => (
    <div
        style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `linear-gradient(to bottom, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }}>
        <svg
            onClick={toggle}
            style={{
                width: 300,
                height: 300,
                ...style,
                tranformOrigin: 'center center',
                transform: `scale(${scale})`,
            }}
            version="1.1"
            viewBox="0 0 400 400"
            className="header-triangle">
            <g className="path" fill={style.color} fillRule="evenodd">
                <path id="path-1" d={path} />
            </g>
            <text fontSize="2em" textAnchor="middle" x="50%" y="50%" fill="#FFFFFF">
                <tspan x="50%" dy="1em" textAnchor="middle">
                    Click me ...
                </tspan>
            </text>
        </svg>
    </div>
)

const TRIANGLE = 'M20,380 L380,380 L380,380 L200,20 L20,380 Z'
const RECTANGLE = 'M20,20 L20,380 L380,380 L380,20 L20,20 Z'

export default class App extends React.Component {
    state = { toggle: true }
    toggle = () => this.setState(state => ({ toggle: !state.toggle }))
    render() {
        const toggle = this.state.toggle
        const color = toggle ? '#c23369' : '#28d79f'
        return (
            <Spring
                from={{ opacity: 0 }}
                to={{
                    color,
                    opacity: 1,
                    gradientStart: toggle ? color : 'black',
                    gradientEnd: toggle ? 'black' : color,
                    number: toggle ? 100 : 0,
                    scale: toggle ? 1 : 2,
                    path: toggle ? TRIANGLE : RECTANGLE,
                }}
                children={Content} // Render prop
                toggle={this.toggle} // Additional props will be spread over the child
            />
        )
    }
}
```