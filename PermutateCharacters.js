/*
* Author: Daniel Okwufulueze
* Date: 10/03/2019
* Name: PermutateCharacters
* Purpose: Recursively generate all permutations of elements in an array in O(n * n!) time. Duplicates are eliminated.
*/

function PermutateCharacters(characters) {
	if (characters.length <= 1) return characters;
	const words = [];

	for (let i = 0; i < characters.length; i += 1) {
		if (characters.indexOf(characters[i]) !== i) continue;
		let theRest = characters.slice(0, i).concat(characters.slice(i + 1));

		const theRestPermutations = PermutateCharacters(theRest);
		for (let j = 0; j < theRestPermutations.length; j += 1) {
			const newWord = characters[i] + theRestPermutations[j];
			words.push(newWord);
		}
	}

	return words;
}

/**
 *
 * 	Time Complexity
 * 	T(1) = 0
 * 	T(2) = (2 * 1) = 2! = 2
 *	T(3) = (3 * 2 * 1) + 3T(2) = 3! + 3T(2) = 6 + 3(2) = 12
 *	T(4) = (4 * 3 * 2 * 1) + 4T(3) = 4! + 4T(3) = 24 + 4(12) = 72
 *	...
 *	...
 *	...
 *	T(n) 	=	(n * (n-1) * (n-2) ... * 3 * 2 * 1) + n(T(n-1))
 *				= n! + n(T(n-1))
 *				= n! + n[(n-1)! + (n-1)T(n-2)]
 *				= n! n! + n(n-1)(T(n-2))
 *				= 2n! + n(n-1)(T(n-2))
 *				= 2n! + n(n-1)[(n-2)! + (n-2)T(n-3)]
 *				= 2n! + n! + n(n-1)(n-2)(T(n-3))
 *				= 3n! + n(n-1)(n-2)(T(n-3))
 *
 *				= i(n!) + n(n-1)(n-2) ... (n-i+1)(T(n-i))
 *				at i = n-2
 *				= (n-2)(n!) + n(n-1)(n-2) ... 3(T(2))
 *				= (n-2)(n!) + n(n-1)(n-2) ... 3(2)
 *				= (n-2)(n!) + n!
 *				= (n - 2 + 1)n!
 *				= (n-1)n!
 *
 *	Therefore
 *	T(n) = (n-1)n!
 *
 * 	PermutateCharacters(['d', 'a', 'n']); => (6) ["dan", "dna", "adn", "and", "nda", "nad"]
 *
 *	PermutateCharacters(['d', 'a', 'n', 'n', 'y']); => (60) ["danny", "danyn", "daynn", "dnany", "dnayn", "dnnay", "dnnya", "dnyan", "dnyna", "dyann", "dynan", "dynna", "adnny", "adnyn", "adynn", "andny", "andyn", "anndy", "annyd", "anydn", "anynd", "aydnn", "ayndn", "aynnd", "ndany", "ndayn", "ndnay", "ndnya", "ndyan", "ndyna", "nadny", "nadyn", "nandy", "nanyd", "naydn", "naynd", "nnday", "nndya", "nnady", "nnayd", "nnyda", "nnyad", "nydan", "nydna", "nyadn", "nyand", "nynda", "nynad", "ydann", "ydnan", "ydnna", "yadnn", "yandn", "yannd", "yndan", "yndna", "ynadn", "ynand", "ynnda", "ynnad"]
 *
 * 	PermutateCharacters(['l', 'e', 'm', 'o', 'n']); => (120) ["lemon","lemno","leomn","leonm","lenmo","lenom","lmeon","lmeno","lmoen","lmone","lmneo","lmnoe","loemn","loenm","lomen","lomne","lonem","lonme","lnemo","lneom","lnmeo","lnmoe","lnoem","lnome","elmon","elmno","elomn","elonm","elnmo","elnom","emlon","emlno","emoln","emonl","emnlo","emnol","eolmn","eolnm","eomln","eomnl","eonlm","eonml","enlmo","enlom","enmlo","enmol","enolm","enoml","mleon","mleno","mloen","mlone","mlneo","mlnoe","melon","melno","meoln","meonl","menlo","menol","molen","molne","moeln","moenl","monle","monel","mnleo","mnloe","mnelo","mneol","mnole","mnoel","olemn","olenm","olmen","olmne","olnem","olnme","oelmn","oelnm","oemln","oemnl","oenlm","oenml","omlen","omlne","omeln","omenl","omnle","omnel","onlem","onlme","onelm","oneml","onmle","onmel","nlemo","nleom","nlmeo","nlmoe","nloem","nlome","nelmo","nelom","nemlo","nemol","neolm","neoml","nmleo","nmloe","nmelo","nmeol","nmole","nmoel","nolem","nolme","noelm","noeml","nomle","nomel"]
 *
 */
