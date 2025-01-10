int trigPin = 11;
int echoPin=12;
long duration, cm, inches;
int A=2;
int B=3;
int C=4;
int D=5;
int E=6;
int F=7;
int G=8;
int DP=9;


void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(A, OUTPUT);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);  
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);

}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin,HIGH);

  cm = (duration/2)/29.1;
  inches = (duration/2)/74;

  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();

  delay(250);

if (cm<10) digitalWrite(A, HIGH);
if (cm>=10) digitalWrite(A, LOW);

if (cm<20) digitalWrite(B, HIGH);
if (cm>=20) digitalWrite(B, LOW);

if (cm<30) digitalWrite(C, HIGH);
if (cm>=30) digitalWrite(C, LOW);

if (cm<40) digitalWrite(D, HIGH);
if (cm>=40) digitalWrite(D, LOW);

if (cm<50) digitalWrite(E, HIGH);
if (cm>=50) digitalWrite(E, LOW);



  
}