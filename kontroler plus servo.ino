
#include <Servo.h>
const int servo1 = 3;
const int servo2 = 10;
const int joyH = A1;
const int joyV = A0;
int servoVal;
int button=0;
Servo myservo1; 
Servo myservo2;
void setup() {
pinMode(13, OUTPUT); 
pinMode(2, INPUT_PULLUP);
myservo1.attach(servo1); 
myservo2.attach(servo2); 
Serial.begin(9600);
}
void loop(){
digitalWrite(13, LOW);
button-digitalRead(2);
if(button==0){
digitalWrite(13, HIGH);
delay(50);
}
servoVal = analogRead(joyH);
servoVal = map(servoVal, 0, 1023, 0, 180); 
myservo2.write(servoVal);
delay(15);
servoVal = analogRead(joyV);
servoVal = map(servoVal, 0, 1023, 0, 180);
myservo1.write(servoVal);
delay(15);
}