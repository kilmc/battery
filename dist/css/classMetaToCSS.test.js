import { classMetaToCSS } from './classMetaToCSS';
describe('classMetaToCSS', function () {
    describe('Given a valid classMetaData object', function () {
        test('Then it generates CSS', function () {
            var classMetaData = {
                source: 'bg-contain',
                selector: 'bg-contain',
                keyword: true,
                classObject: {
                    'background-size': 'contain',
                },
            };
            expect(classMetaToCSS(classMetaData, [])).toEqual('.bg-contain { background-size: contain }'.trim());
        });
    });
});
