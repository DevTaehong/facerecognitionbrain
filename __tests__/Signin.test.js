/**
 * @jest-environment jsdom
 */
import Signin from '../src/components/Signin/Signin';
import renderer from 'react-test-renderer';

const user = {
    id: "1", 
    name: "Taehong", 
    email: "minth1123@icloud.com", 
    joined: "Today"
}

it("renders correctly", () => {
    const tree = renderer
    .create(<Signin loadUser={user} onRouteChange={"home"} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders as an anchor when no user is set', () => {
    const tree = renderer.create(<Signin />).toJSON();
    expect(tree).toMatchSnapshot();
});