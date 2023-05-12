/**
 * @jest-environment jsdom
 */
import ImageLinkForm from '../src/components/ImageLinkForm/ImageLinkForm';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ImageLinkForm', () => {
    const mockProps = {
        onPictureSubmit: jest.fn(),
        ageRange: '25-30',
        isLoading: false,
        onInputChange: jest.fn(),
        ageResult: '',
        input: '',
    };
    let wrapper;
    wrapper = shallow(<ImageLinkForm {...mockProps}/>)

    it('renders without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('displays the age range if a file has been uploaded', () => {
        const wrapper = shallow(<ImageLinkForm {...mockProps}  />);
        expect(wrapper.find('.center.black.f4.b.pt1').text()).toContain('Your age is between:');
    });

    it('displays the age range and age entered if a file has been uploaded and age entered has a value', () => {
        const wrapper = shallow(<ImageLinkForm {...mockProps} input="27" />);
        expect(wrapper.find('.center.black.f4.b.pt1').text()).toContain('Your age is between:');
        expect(wrapper.find('.center.black.f4.b.pt1').text()).toContain('Age entered: 27');
    });

    it('displays the message that face age is more than 70 if age range is "more than 70"', () => {
        const wrapper = shallow(<ImageLinkForm {...mockProps} ageRange="more than 70" />);
        expect(wrapper.find('.center.black.f4.b.pt1').text()).toContain('Your face age is more than 70');
    });

    it('displays a loading spinner when isLoading is true', () => {
        const wrapper = shallow(<ImageLinkForm {...mockProps} isLoading />);
        expect(wrapper.find('LoadingSpinner')).toHaveLength(1);
    });

    it('doesnt renders ImageUploader component when there is no image file URL', () => {
        const wrapper = shallow(<ImageLinkForm {...mockProps} />);
        expect(wrapper.find('ImageUploader').length).toBe(0);
    });
});
