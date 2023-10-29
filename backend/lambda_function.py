import json
import boto3
import time

def lambda_handler(event, context):
    client = boto3.client("rekognition")
    s3 = boto3.client("s3")

    fileObj = s3.get_object(Bucket = "s3-schoolcamfootage", Key = "avengers.mp4")
    file_content = fileObj["Body"].read()
    #response = detect_labels("s3-schoolcamfootage", "hd0992.mov",client)
    startLabelDetection = client.start_label_detection(
        MinConfidence=65,
        Video = {
            'S3Object': {
                'Bucket': "s3-schoolcamfootage",
                'Name': "avengers.mp4"
            }
        }

    )

    labelsJobId = startLabelDetection['JobId']
    print("Job Id: {0}".format(labelsJobId))

    # Wait for object detection job to complete
    # In production use cases, you would usually use StepFunction or SNS topic to get notified when job is complete.
    getObjectDetection = client.get_label_detection(
        JobId=labelsJobId,
        SortBy='TIMESTAMP'
    )

    while(getObjectDetection['JobStatus'] == 'IN_PROGRESS'):
        time.sleep(5)
        print('.', end='')

        getObjectDetection = client.get_label_detection(
        JobId=labelsJobId,
        SortBy='TIMESTAMP')

    # Show JSON response returned by Rekognition Object Detection API
    # In the JSON response below, you will see list of detected objects and activities.
    # For each detected object, you will see information like Timestamp
    print(getObjectDetection)
    flaggedObjectsInVideo = ["Car"]

    theObjects = {}

    # Display timestamps and objects detected at that time
    strDetail = "Objects detected in video: "
    strOverall = "Objects in the overall video: "

    # Objects detected in each frame
    for obj in getObjectDetection['Labels']:
        ts = obj ["Timestamp"]
        cconfidence = obj['Label']["Confidence"]
        oname = obj['Label']["Name"]

        #if(oname in flaggedObjectsInVideo):

            #print("Found flagged object at {} ms: {} (Confidence: {})".format(ts, oname, round(cconfidence,2)))

        strDetail = strDetail + "Object: {} (Confidence: {})".format(oname, round(cconfidence,2))

        theObjects[oname] = {"Name" : oname, "Confidence": round(cconfidence,2)}


    # Unique objects detected in video
    for theObject in theObjects:
        strOverall = strOverall + "(Name: {}, Confidence: {}), ".format(theObject, theObjects[theObject]["Confidence"])

    # Display results
    print(strOverall)
    return {
        'statusCode': 200,
        'body': json.dumps(strOverall)
    }
