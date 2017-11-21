
// -- Implementation ---------------------------------------------------

/**
 * The `Either(a, b)` structure represents the logical disjunction between `a`
 * and `b`. In other words, `Either` may contain either a value of type `a` or
 * a value of type `b`, at any given time. This particular implementation is
 * biased on the right value (`b`), thus projections will take the right value
 * over the left one.
 *
 * This class models two different cases: `Left a` and `Right b`, and can hold
 * one of the cases at any given time. The projections are, none the less,
 * biased for the `Right` case, thus a common use case for this structure is to
 * hold the results of computations that may fail, when you want to store
 * additional information on the failure (instead of throwing an exception).
 *
 * Furthermore, the values of `Either(a, b)` can be combined and manipulated by
 * using the expressive monadic operations. This allows safely sequencing
 * operations that may fail, and safely composing values that you don't know
 * whether they're present or not, failing early (returning a `Left a`) if any
 * of the operations fail.
 *
 * While this class can certainly model input validations, the [Validation][]
 * structure lends itself better to that use case, since it can naturally
 * aggregate failures — monads shortcut on the first failure.
 *
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 * @summary
 * Either[α, β] <: Applicative[β]
 *               , Functor[β]
 *               , Chain[β]
 *               , Show
 *               , Eq
 */
declare class Either<R, L> {

    /**
     * Constructs a new `Either[α, β]` structure from a nullable type.
     *
     * Takes the `Left` case if the value is `null` or `undefined`. Takes the
     * `Right` case otherwise.
     *
     * @summary α → Either[α, α]
     */
    static fromNullable<T>(a: T) : Either<T, T>
    fromNullable : typeof Either.fromNullable;


    /**
     * Constructs a new `Either[α, β]` structure holding a `Left` value. This
     * usually represents a failure due to the right-bias of this structure.
     *
     * @summary a → Either[α, β]
     */
    static Left<T, K>(val: T) : Either<K, T>

    /**
     * Constructs a new `Either[α, β]` structure holding a `Right` value. This
     * usually represents a successful value due to the right bias of this
     * structure.
     *
     * @summary β → Either[α, β]
     */
    static Right<T, K>(val : T) : Either<T, K>


    /**
     * Constructs a new `Either[α, β]` structure from a `Validation[α, β]` type.
     *
     * @summary Validation[α, β] → Either[α, β]
     */
    // TODO
    // Either.fromValidation = function(a) {
    //     return a.fold(Either.Left, Either.Right)
    // }

    /**
     * Executes a synchronous computation that may throw and converts it to an
     * Either type.
     *
     * @summary (α₁, α₂, ..., αₙ -> β :: throws γ) -> (α₁, α₂, ..., αₙ -> Either[γ, β])
     */
    static try()

    /**
     * True if the `Either[α, β]` contains a `Left` value.
     *
     * @summary Boolean
     */
    isLeft : boolean;

    /**
     * True if the `Either[α, β]` contains a `Right` value.
     *
     * @summary Boolean
     */
    isRight : boolean;

    /**
     * Creates a new `Either[α, β]` instance holding the `Right` value `b`.
     *
     * `b` can be any value, including `null`, `undefined` or another
     * `Either[α, β]` structure.
     *
     * @summary β → Either[α, β]
     */
    static of<T, K> (a: T) : Right<T, K>

    of : typeof Either.of;


    /**
     * Applies the function inside the `Right` case of the `Either[α, β]` structure
     * to another applicative type.
     *
     * The `Either[α, β]` should contain a function value, otherwise a `TypeError`
     * is thrown.
     *
     * @method
     * @summary (@Either[α, β → γ], f:Applicative[_]) => f[β] → f[γ]
     */
    ap<T>(fn: (a: R) => T) : Either<T, L>;
    /**
     * Transforms the `Right` value of the `Either[α, β]` structure using a regular
     * unary function.
     *
     * @method
     * @summary (@Either[α, β]) => (β → γ) → Either[α, γ]
     */
    map<T>(fn : (v: R) => T) : Either<T, L>

    /**
     * Transforms the `Right` value of the `Either[α, β]` structure using an unary
     * function to monads.
     *
     * @method
     * @summary (@Either[α, β], m:Monad[_]) => (β → m[γ]) → m[γ]
     */
    chain<T>(fn : (v: R) => T) : T;

    /**
     * Concats the `Right` value of the `Either[α, β]` structure with another `Right` or keeps the `Left` on either side
     *
     * @method
     * @summary (@Either[α, m:Monoid]) => Either[β, m] → Either[α, m]
     */
    concat<T>(val: Either<T, L>) : Either<T, L>

    /**
     * Returns a textual representation of the `Either[α, β]` structure.
     *
     * @method
     * @summary (@Either[α, β]) => Void → String
     */
    toString() : string

    /**
     * Tests if an `Either[α, β]` structure is equal to another `Either[α, β]`
     * structure.
     *
     * @method
     * @summary (@Either[α, β]) => Either[α, β] → Boolean
     */
    isEqual(val : Either<R, L>) : boolean;

    /**
     * Extracts the `Right` value out of the `Either[α, β]` structure, if it
     * exists. Otherwise throws a `TypeError`.
     *
     * @method
     * @summary (@Either[α, β]) => Void → β         :: partial, throws
     * @see {@link module:lib/either~Either#getOrElse} — A getter that can handle failures.
     * @see {@link module:lib/either~Either#merge} — The convergence of both values.
     * @throws {TypeError} if the structure has no `Right` value.
     */
    get() : R;

    /**
     * Extracts the `Right` value out of the `Either[α, β]` structure. If the
     * structure doesn't have a `Right` value, returns the given default.
     *
     * @method
     * @summary (@Either[α, β]) => β → β
     */
    getOrElse(val : R) : R;


    /**
     * Transforms a `Left` value into a new `Either[α, β]` structure. Does nothing
     * if the structure contain a `Right` value.
     *
     * @method
     * @summary (@Either[α, β]) => (α → Either[γ, β]) → Either[γ, β]
     */
    orElse(fn: (val: L) => Either<R, L>) : Either<R, L>


    /**
     * Returns the value of whichever side of the disjunction that is present.
     *
     * @summary (@Either[α, α]) => Void → α
     */
    merge() : R | L


    /**
     * Applies a function to each case in this data structure.
     *
     * @method
     * @summary (@Either[α, β]) => (α → γ), (β → γ) → γ
     */
    fold<T>(leftFn: (val: L) => T, rightFn: (val: R) => T) : T



    /**
     * Swaps the disjunction values.
     *
     * @method
     * @summary (@Either[α, β]) => Void → Either[β, α]
     */
    swap() : Either<L, R>


    /**
     * Maps both sides of the disjunction.
     *
     * @method
     * @summary (@Either[α, β]) => (α → γ), (β → δ) → Either[γ, δ]
     */
    bimap<T, K>(leftFn: (val: L) =>  K, rightFn: (val: R) => T) : Either<T, K>

    /**
     * Maps the left side of the disjunction.
     *
     * @method
     * @summary (@Either[α, β]) => (α → γ) → Either[γ, β]
     */
    leftMap<T>(fn : (v: L) => T) : Either<R, T>


}
/**
 * Constructs a new `Either[α, β]` structure holding a `Left` value. This
 * usually represents a failure due to the right-bias of this structure.
 *
 * @summary a → Either[α, β]
 */
declare class Left<R, L> extends Either<R, L>{}

/**
 * Constructs a new `Either[α, β]` structure holding a `Right` value. This
 * usually represents a successful value due to the right bias of this
 * structure.
 *
 * @summary β → Either[α, β]
 */
declare class Right<R, L> extends Either<R, L>{}



// -- Conversions ------------------------------------------------------


// Either.try = function(f) {
//   return function() {
//     try {
//       return new Right(f.apply(null, arguments))
//     } catch(e) {
//       return new Left(e)
//     }
//   }
// }





// /**
//  * Catamorphism.
//  *
//  * @method
//  * @summary (@Either[α, β]) => { Left: α → γ, Right: β → γ } → γ
//  */
// Either.prototype.cata = unimplemented

// Left.prototype.cata = function(pattern) {
//   return pattern.Left(this.value)
// }

// Right.prototype.cata = function(pattern) {
//   return pattern.Right(this.value)
// }

export = Either;

