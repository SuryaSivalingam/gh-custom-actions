const core=require('@actions/core');
// const github=require('@actions/github');
const exec=require('@actions/exec');

function run(){
   
    core.notice('Hello from JavaScript Custom Action');

    //Getting inputs
    const bucketName = core.getInput('bucket-name', { required: true });
    const bucketRegion = core.getInput('bucket-region', { requiredd: false });
    const artifactFolder = core.getInput('artifact-folder' , { required: true });
    
    // Upload artifacts
    const s3Uri = `s3://${bucketName}`;
    exec.exec(`aws s3 sync ${artifactFolder} ${s3Uri} --region ${bucketRegion}`);
    
    // Website URL
    const websiteUrl = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url',websiteUrl);

}

run();