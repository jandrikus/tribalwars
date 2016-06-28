def ordenar(pueblos,puebloInicio):
	listaDePueblos=pueblos.split()
	c={}
	for pueblo in listaDePueblos:
		if pueblo not in c:
			c[pueblo]=distancia(pueblo, puebloInicio)
	d=[]
	for pueblo1 in c:
		d+=[[pueblo1,c[pueblo1]]]
	s=''
	print c
	d=sorted(d,key=lambda x: x[1])
	for pueblo in d:
		s+=pueblo[0]+' '
	f=open('coordenadas','w')
	f.write(s[:-1])
	f.close()
	return s[:-1]
			
def distancia(pueblo, puebloInicio):
	pueblo = pueblo.split('|')
	puebloInicio = puebloInicio.split('|')
	return ((float(pueblo[0])-float(puebloInicio[0]))**2+(float(pueblo[1])-float(puebloInicio[1]))**2)**0.5