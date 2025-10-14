Our webserver has a process that blocks malicious IP addresses, and then releases the block after some period of time. This process generates a log file that contains lines like this:
 
2021-05-07 00:01:30.034 Block 74.152.237.66
2021-05-07 00:05:05.984 Block 79.118.67.43
2021-05-07 00:05:52.435 Block 183.35.232.214
2021-05-07 00:13:08.376 Release 74.152.237.66
2021-05-07 00:15:23.802 Block 157.152.167.232
 
Each line contains the date and time the IP address was blocked or released, the word "Block" if the IP address was blocked, or the word "Release" if the IP address was released, and the IP address affected.
 
We have a log for one particular day at https://public.karat.io/content/test/test_log.txt. We would like to know how many times we blocked IP addresses this day. Write a program that fetches/downloads and reads the given log file, then outputs how many times IP addresses were blocked in this file.
 
Sample output (in any format)
668



Find the top 5 readers who got the most points over the summer by processing a file that has records of readers, book names and number of pages: 
 Each reader gets: 
 •50 points for reading a book 
 •1 point for each page in the book 
 The output should be the top 5 readers IDs along with how many points they scored.

   Part of the reading program is a competition. Readers get points for reading books of various lengths as follows:

* 50 points for reading the book
* 1 point for each page in the book

For example:
* A book with 25 pages is worth 75 points
* A book with 100 pages is worth 150 points.

We want to find which readers got the most points over the summer.

Write a program that outputs a list of the top five readers, identified by their ID, along with how many points they scored.

Test output: (in any format)
125 28923
834 28463
411 27671
340 24496
80 22198

For your reference, here are example lines from the file:
<reader id>,<reader name>,<book name>,<number of pages>
157,Kelly,a wrinkle in time,50
231,Selina,to kill a mockingbird,300
74,Juan,to kill a mockingbird,300
558,Elysse,hush hush,200

The file is at https://public.karat.io/content/test/test_file.txt
