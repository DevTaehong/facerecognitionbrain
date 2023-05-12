/**
 * @jest-environment jsdom
 */
import App from '../src/containers/App';
import renderer from 'react-test-renderer';


it("renders correctly", () => {
    const tree = renderer
    .create(<App />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

