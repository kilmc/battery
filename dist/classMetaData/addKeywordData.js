export var addKeywordData = function (classMetaArr, matchers) {
    return classMetaArr.map(function (classMeta) {
        if (!matchers.keyword) {
            classMeta.keyword = false;
        }
        else {
            classMeta.keyword = matchers.keyword.test(classMeta.source);
        }
        return classMeta;
    });
};
