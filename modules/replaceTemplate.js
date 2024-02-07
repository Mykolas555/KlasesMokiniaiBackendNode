module.exports = (template, moksleiviai)=> {
    const average = (moksleiviai.subjects_grades.math + moksleiviai.subjects_grades.physics + moksleiviai.subjects_grades.chemistry) / 3;

    let output = template.replace(/{%FIRSTNAME%}/g, moksleiviai.firstname);
    output = output.replace(/{%LASTNAME%}/g, moksleiviai.lastName);
    output = output.replace(/{%CLASS%}/g, moksleiviai.class);
    output = output.replace(/{%ID%}/g, moksleiviai.id);
    output = output.replace(/{%MATH%}/g, moksleiviai.subjects_grades.math);
    output = output.replace(/{%PHYSICS%}/g, moksleiviai.subjects_grades.physics);
    output = output.replace(/{%CHEMISTRY%}/g, moksleiviai.subjects_grades.chemistry);
    output = output.replace(/{%AVERAGE%}/g, average);

    return output;
}